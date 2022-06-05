import { Layout } from '@components/common'
import { useContext, useEffect } from 'react'
import s from '../components/product/ProductCard/ProductCard.module.css'
import Cookies from 'cookies'
import { DataStore } from '../utils/DataStore'
import { ProductCard } from '@components/product'
import { Marquee, Hero } from '@components/ui'
import Image from 'next/image'
// import { Grid, Marquee, Hero } from '@components/ui'
import db from '../utils/db'
import Store from '../models/Store'
import PhysicalProduct from '../models/PhysicalProduct'
import DigitalProduct from '../models/DigitalProduct'
import Grid from '@mui/material/Grid'

export default function Home({}) {
  const { state } = useContext(DataStore)
  const { storeInfo } = state
  return (
    <>
      <Grid container >
      <Grid item sx={{border:'1px solid black',margin:2}}xs={2}>
          <Image                     className={s.productImage}

            src={'/categories/ring.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
        <Grid item sx={{border:'1px solid black',margin:2}}xs={3}>
          <Image                     className={s.productImage}

            src={'/categories/necklace.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
        <Grid item sx={{border:'1px solid black',margin:2}}xs={6}>
          <Image                     className={s.productImage}

            src={'/categories/bracelet.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
   
     
        <Grid item sx={{border:'1px solid black',margin:2}}xs={4}>
          <Image                     className={s.productImage}

            src={'/categories/earrings.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
        <Grid item sx={{border:'1px solid black',margin:2}}xs={4}>
          <Image                     className={s.productImage}

            src={'/categories/necklace.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
        <Grid item sx={{border:'1px solid black',margin:2}}xs={3}>
          <Image                     className={s.productImage}

            src={'/categories/necklace.jpg'}
            height={200}
            width={200}
            alt="Necklace"
          />
        </Grid>
      </Grid>

     
    </>
  )
}

Home.Layout = Layout
