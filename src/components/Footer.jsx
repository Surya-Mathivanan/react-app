import React from 'react'

function Footer() {
  return (
    <>
    <footer style={{ background: "#222", color: "#fff", padding: "10px 0", textAlign: "center" }}>
        <div style={{ marginBottom: "3px" }}>
            &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
        </div>
        <div>
            <a href="/profile" style={{ color: "#fff", margin: "2 10px", textDecoration: "underline" }}>Privacy Policy</a>
            |
            <a href="/profile" style={{ color: "#fff", margin: "0 10px", textDecoration: "underline" }}>Terms of Service</a>
            |
            <a href="/profile" style={{ color: "#fff", margin: "0 10px", textDecoration: "underline" }}>Contact</a>
        </div>
    </footer>
    </>
  )
}

export default Footer