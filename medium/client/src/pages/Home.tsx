

const Home = () => {
  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center bg-white">
        <p className="font-semibold text-lg mb-2">directions:</p>
        <p>go to the <a href="/signup"> /signup </a> route for signing up as a new user</p>
        <p>go to the <a href="/signin"> /signin </a> route for signing in as an existing user</p>
        <p>then enjoy the blog posts</p>
    </div>
    </>
  )
}

export default Home