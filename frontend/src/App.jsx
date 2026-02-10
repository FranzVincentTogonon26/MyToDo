import { useAuth } from "./context/useAuth"


function App() {

  const { loading, isAuthenticated } = useAuth();

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <div>Hello</div>
  )
}

export default App
