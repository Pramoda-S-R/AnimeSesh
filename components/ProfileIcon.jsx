import React from "react";

const ProfileIcon = () => {
  const isLoggedIn = false; // Replace with actual authentication logic
  if (isLoggedIn) {
    return (
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    );
  } else {
    return <button className="btn btn-soft btn-info">Login</button>;
  }
};

export default ProfileIcon;
