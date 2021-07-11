
export default function redirectToProfile(playerId, jwtToken) {
  localStorage.setItem("jwt", jwtToken)
  localStorage.setItem("playerId", playerId)
  const redirectUrl = localStorage.getItem("redirectUrl")
  localStorage.removeItem("redirectUrl")
  window.location = redirectUrl || `/profiles/${playerId}`
}