You got it. Here's a clean **folder structure** for your anime tracker app using **Next.js + Supabase + Zustand**. It's built with scalability and organization in mind, while keeping things simple enough to move fast.

---

## 📁 Folder Structure

```
anime-tracker/
├── components/
│   ├── Navbar.js
│   └── AnimeCard.js
│
├── lib/
│   └── supabaseClient.js
│
├── pages/
│   ├── api/                    # Optional: for edge/server logic
│   ├── index.js                # Home/Search page
│   ├── watchlist.js            # User’s personal watchlist
│   ├── login.js
│   └── signup.js
│
├── public/
│   └── favicon.ico            # Static files
│
├── store/
│   └── useWatchlist.js        # Zustand state management
│
├── styles/
│   └── globals.css            # Tailwind or custom styles
│
├── .env.local                 # Supabase keys
├── tailwind.config.js         # If using Tailwind
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## 📄 File Breakdown

---

### `lib/supabaseClient.js`

```js
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useEffect, useState } from 'react'

const SupabaseContext = createContext()

export function SupabaseProvider({ children }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)
```

---

### `store/useWatchlist.js`

```js
import { create } from 'zustand'

const useWatchlist = create((set, get) => ({
  watchlist: [],
  loading: false,
  authValue: {},

  setAuth: (auth) => set({ authValue: auth }),

  fetchWatchlist: async () => {
    const { supabase, session } = get().authValue
    if (!session) return
    set({ loading: true })
    const { data } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', session.user.id)
    set({ watchlist: data || [], loading: false })
  },

  addAnime: async (anime) => {
    const { supabase, session } = get().authValue
    const { mal_id, title, images } = anime
    const image_url = images.jpg.image_url
    const { data } = await supabase
      .from('watchlist')
      .insert([{ mal_id, title, image_url, user_id: session.user.id }])
      .select()
    set((state) => ({ watchlist: [...state.watchlist, ...data] }))
  },

  removeAnime: async (mal_id) => {
    const { supabase, session } = get().authValue
    await supabase.from('watchlist').delete().eq('mal_id', mal_id).eq('user_id', session.user.id)
    set((state) => ({
      watchlist: state.watchlist.filter((anime) => anime.mal_id !== mal_id),
    }))
  }
}))

export default useWatchlist
```

---

### `components/Navbar.js`

```js
import Link from 'next/link'
import { useSupabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { supabase, session } = useSupabase()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4">Search</Link>
        <Link href="/watchlist">Watchlist</Link>
      </div>
      <div>
        {session ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
```

---

### `components/AnimeCard.js`

```js
export default function AnimeCard({ anime, onAdd, onRemove, isInWatchlist }) {
  return (
    <div className="border p-2">
      <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full" />
      <h3 className="font-bold text-sm mt-2">{anime.title}</h3>
      {isInWatchlist ? (
        <button onClick={() => onRemove(anime.mal_id)} className="mt-2 bg-red-500 text-white text-sm px-2 py-1">
          Remove
        </button>
      ) : (
        <button onClick={() => onAdd(anime)} className="mt-2 bg-green-500 text-white text-sm px-2 py-1">
          + Add to Watchlist
        </button>
      )}
    </div>
  )
}
```

---

### `pages/index.js`

```js
import { useState } from 'react'
import useWatchlist from '../store/useWatchlist'
import AnimeCard from '../components/AnimeCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const { addAnime, watchlist } = useWatchlist()

  const searchAnime = async (e) => {
    e.preventDefault()
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
    const data = await res.json()
    setResults(data.data)
  }

  return (
    <div className="p-6">
      <form onSubmit={searchAnime}>
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2">Search</button>
      </form>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onAdd={addAnime}
            isInWatchlist={watchlist.some((a) => a.mal_id === anime.mal_id)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

### `pages/watchlist.js`

```js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useWatchlist from '../store/useWatchlist'
import { useSupabase } from '../lib/supabaseClient'
import AnimeCard from '../components/AnimeCard'

export default function Watchlist() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const { watchlist, fetchWatchlist, removeAnime, setAuth } = useWatchlist()

  useEffect(() => {
    if (!session) return router.push('/login')
    setAuth({ supabase, session })
    fetchWatchlist()
  }, [session])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchlist.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onRemove={removeAnime}
            isInWatchlist={true}
          />
        ))}
      </div>
    </div>
  )
}
```

---

### `pages/login.js` and `pages/signup.js`

Covered in previous messages — simple forms that call `supabase.auth.signInWithPassword()` or `signUp()`.

---

### `_app.js`

```js
import '../styles/globals.css'
import { SupabaseProvider } from '../lib/supabaseClient'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <SupabaseProvider>
      <Navbar />
      <Component {...pageProps} />
    </SupabaseProvider>
  )
}
export default MyApp
```

---

## 💡 Bonus Tips
- Add `loading` indicators in Zustand and show spinners on pages
- Use `react-hot-toast` for success/error alerts
- Create a `hooks/` folder if you're doing more reusable logic
- Add `anime/[id].js` route later for detail pages using Jikan API

---

Want me to generate this boilerplate code as a GitHub repo starter or zip you can run instantly? I can also help you deploy to Vercel when you're ready.