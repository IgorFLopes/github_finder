// vou exportar esse tipo que vai ser utilizado em vários locais! 

export type UserProps = {
    // vamos adicionar as propriedades 
    avatar_url: string,
    login: string,
    location: string,
    followers: number,
    following: number,
}