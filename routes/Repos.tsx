import type { RepoProps } from "../types/repo";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import classes from "./Repos.module.css";
import Repo from "../components/Repo";

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRepos = async (username: string) => {
      setIsLoading(true);

      const res = await fetch(`https://api.github.com/users/${username}/repos`);

      const data = await res.json();

      setIsLoading(false);

      // console.log(data)çl

      let orderedRepos = data.sort((a:RepoProps, b:RepoProps) => b.stargazers_count - a.stargazers_count) 

      orderedRepos = orderedRepos.slice(0, 6)

      // setRepos(data);
      setRepos(orderedRepos)
    };
    if (username) {
      loadRepos(username);
    }
  }, [username]);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2>
      {/* depois vou checar se as respo existe e a length for igual a 0 eu quero exibir que não existe repositório*/}
      {repos && repos.length === 0 && <p>Não há repositórios.</p>}
      {/* Vou checar se as repos existem, e se a length for maior que zero eu vou exibir alguma coisa*/}
      {repos && repos.length > 0 && (
        <div className={classes.repos_container}>
          {repos.map((repo: RepoProps) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            // <p>{repo.name}</p>
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;
