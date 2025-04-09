import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const ProfileIcon = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  // const isLoggedIn = false; // Replace with actual authentication logic
  if (data?.user) {
    return <button className="btn btn-soft btn-info" onClick={logout}>Logout</button>;
  } else {
    return <button className="btn btn-soft btn-info">Login</button>;
  }
};

export default ProfileIcon;
