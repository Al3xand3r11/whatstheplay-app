"use client";
import { useState } from 'react';

type ContactFields = {
  [key: string]: string|undefined;
  fullname: string|undefined;
  email: string|undefined;

}

type ErrorField = {
  fullname: boolean;
  email: boolean;
}

export default function Home() {

  const initialContactState: ContactFields = {
    fullname: "",
    email: "",
  }

  const initialErrorState: ErrorField = {
    fullname: false,
    email: false,
  }

  const [dataSend, setDataSend] = useState<ContactFields>(initialContactState);
  const [error, setError] = useState<ErrorField>(initialErrorState);
  const [status, setStatus] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);
  const [result, setResult] = useState<String>("");

  const handleSubmit = async(e: any) => {
    e.preventDefault();

    setError(initialErrorState);
    let hasErr = false;
    await Object.keys(initialErrorState).map((err) => {
      if (dataSend[err] == "" || dataSend[err] == undefined){
        setError({...error, [err]: true});
        hasErr=true

      }
    })

    if (hasErr) return;
    console.log(dataSend);
  }
  return (
    <main>

      <div>
        <form>
        <label>Full Name</label>
        <input type="text" value={dataSend.fullname ?? ""}
        onBlur={() => setError({...error, fullname: true})}
        onChange={(e) => setDataSend({...dataSend,fullname: e.target.value})}
        />
        {error.fullname && !dataSend.fullname && <span>Please write your full name</span>}
        <label>Email</label>
        <input type="text" value={dataSend.email ?? ""}
        onBlur={() => setError({...error, email: true})}
        onChange={(e) => setDataSend({...dataSend,email: e.target.value})}/>
        {error.email && (!dataSend.email || !/\S+@\S+\S+\.\S+/.test(dataSend.email)) && <span>Please write a valid email</span>}
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>

        {status && <div> Sending...</div>}
        {success && <div>{result}</div>}
        </form>
      </div>
    </main>
  )
}
