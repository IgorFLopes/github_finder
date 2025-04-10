// importar o tipo
import type { UserProps } from "../types/user"

import Loader from "../components/Loader"


import User from "../components/User"

import Search from "../components/Search"
// para fazer requisição de um usuário
import { useState } from "react"

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Error from "../components/Error"


const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // criar a função que vai carregar o usuário da API do gitHub, "userName como parametro"

    const loadUser = async(userName: string) => {
        // vou acessar a API do GitHub baseado nesse nome de usuário
        setIsLoading(true)
        setError(false)
        setUser(null)

        const respostaApi = await fetch(`https://api.github.com/users/${userName}`)

        const data = await respostaApi.json()

        setIsLoading(false)

        if(respostaApi.status === 404) {
          setError(true)
          return
        }

        // agora vamos desistriturar o objeto, para pegar apenas informações que desejo. 
        const {avatar_url, login, location, followers, following} = data

        // vou constituir um novo objeto apenas com aquelas váriavéis acima!
        const userData: UserProps = {
          avatar_url, followers, following, location, login 
        }

        setUser(userData)
    }

  return <div>
    {/* vou ter que enviar por meio de props a função, para ser disparada no "Search" */}
    <Search loadUser={loadUser} />
    {isLoading && <Loader />}
    {/* agora preciso de uma maneira de exibir os dados do usuário */}
    {user && <User {...user}/>}
    {error && <Error />}
  </div>
    
}

export default Home
