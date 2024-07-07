import "./Home.scss"
import { BsPersonFillAdd } from "react-icons/bs"
import { CiLogin } from "react-icons/ci"

const Home = () => {

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage:`url(/back.png)`
      }}>

        <div>
          <button> Login <CiLogin />  </button>
          <button>Sign Up <BsPersonFillAdd /></button>
        </div>
      </div>

    </section>
  )
}

export default Home