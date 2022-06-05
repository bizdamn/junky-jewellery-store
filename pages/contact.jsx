import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import { useForm } from 'react-hook-form';

export default function contact() {
    const {register,handleSubmit} = useForm();
    async function submitHandler (data) {
    // console.log(data)
    const response = await fetch("/api/email/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    console.log(response)
    }
    return (
        <>
            <div className="custom-wrap">
                <div className="custom-image global-bg-image" style={{ backgroundImage: 'url(/img/main/contact.jpg)' }} />
                <div className="custom-container">

                    <div className="custom-content">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <h1>Contact me</h1>
                            <label htmlFor="name">Your name</label>
                            <input id="name" type="text" name="name" {...register('name')} required />
                            <label htmlFor="email">Your email address</label>
                            <input id="email" type="email" name="email" {...register('email')} required />
                            <label htmlFor="message">Your message</label>
                            <textarea id="message" name="message" required {...register('message')} defaultValue={""} />
                            <button className="global-button" type="submit">Send message</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
