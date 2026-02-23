import React from "react";
import {Button} from '../ui/Button.jsx'

export const FormLogin = ({handleSubmit, formData, setFormData}) => {
    return (<form onSubmit={handleSubmit}>
        <label htmlFor="username">{"username"}</label>
        <input type="text" placeholder={'Masukan Nama Pengguna'}
               id={'username'}
               onChange={(e) => setFormData({...formData, username: e.target.value})}/>
        <label htmlFor="password">{'Kata Sandi'}</label>
        <input type="password" placeholder={"Masukan Kata Sandi"}
               id={'password'}
               onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <Button type="submit">submit</Button>
    </form>)
}

export const FormKontakSekolah = ({handleSubmit, formKontakSekolah, setFormKontakSekolah}) => {
    return <form onSubmit={handleSubmit}>
        <label htmlFor="kontak">alamat</label>
        <input type="text" placeholder={'Masukan Kontak'} id={'alamat'} onChange={(e) => {
            setFormKontakSekolah({...formKontakSekolah, alamat: e.target.value})
        }}/>
        <label htmlFor="nomorTelpon">nomor telpon</label>
        <input type="text" placeholder={'Masukan Kontak'} id={'nomorTelpon'} onChange={(e) => {
            setFormKontakSekolah({...formKontakSekolah, nomorTelpon: e.target.value})
        }}/>
        <label htmlFor="email">Email</label>
        <input type='email' placeholder={'Masukan Email'} id={'email'} onChange={(e) => {
            setFormKontakSekolah({...formKontakSekolah, email: e.target.value})
        }}/>
        <Button type="submit">submit</Button>

    </form>
}