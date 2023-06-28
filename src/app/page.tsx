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
        <button type="submit">
          Submit
        </button>
        </form>
      </div>
    </main>
  )
}
