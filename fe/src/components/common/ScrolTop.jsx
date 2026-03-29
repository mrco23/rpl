import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrolTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // bisa ganti ke 'auto' jika tidak mau smooth
    });
  }, [pathname]);

  return null;
}
