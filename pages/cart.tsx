import type { GetStaticPropsContext } from 'next'
import { FC, useContext, useState, useEffect } from 'react'
// import useCart from '@framework/cart/use-cart'
// import usePrice from '@framework/product/use-price'
import Cookies from 'js-cookie';
import Link from 'next/link'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Button, Text } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { CartItem } from '@components/cart'
import { useUI } from '@components/ui/context'
import { DataStore } from '../utils/DataStore'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories },
  }
}

export default function Cart() {
  const { state ,dispatch} = useContext(DataStore)
  const { cart } = state
  const isEmpty = cart.cartItems.length == 0 ? true : false
  const isLoading = false
  const error = null
  const success = null
  const { openSidebar, setSidebarView } = useUI()

  const round2 = (num: any) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.456 => 123.46
  useEffect(() => {
    const itemsPrice = round2(
      cart.cartItems.reduce(
        (a: any, c: any) => a + c.price.value * c.quantity,
        0
      )
    )
    setSubTotal(itemsPrice)
  }, [cart])

  const [subTotal, setSubTotal] = useState(0)
  const [shipping, setShipping] = useState(50)
  let total = round2(subTotal) + round2(shipping)
  
  const handleShippingChange = (event:any) => {
    setShipping(event.target.value)
  }

  async function CheckoutCookieSet(){
    Cookies.set('orderInfo', JSON.stringify({subTotal: subTotal,total: total,shippingPrice: shipping}));
    // dispatch({ type: 'ORDER_INFO_SETUP', payload: JSON.stringify({subTotal: subTotal,total: total,shippingPrice: shipping})});
   }

   

  const goToCheckout = () => {
    openSidebar()
    setSidebarView('CHECKOUT_VIEW')
  }


  return (
    <div className="grid lg:grid-cols-12 w-full max-w-7xl mx-auto">
      <div className="lg:col-span-8">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Thank you for your order.
            </h2>
          </div>
        ) : (
          <div className="px-4 sm:px-6 flex-1">
            <Text variant="pageHeading">My Cart</Text>
            <Text variant="sectionHeading">Review your Order</Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b border-accent-2">
              {cart.cartItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={item.price.currencyCode}
                />
              ))}
            </ul>
            {/* <div className="my-6">
              <Text>
                Before you leave, take a look at these items. We picked them
                just for you
              </Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="border border-accent-3 w-full h-24 bg-accent-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div> */}
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
            <>
              {/* Shipping Address */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                <div className="mr-5">
                  <MapPin />
                </div>
                <div className="text-sm text-center font-medium">
                  <span className="uppercase">+ Add Shipping Address</span>
                  {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                </div>
              </div>
              {/* Payment Method */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              {/* <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                <div className="mr-5">
                  <CreditCard />
                </div>
                <div className="text-sm text-center font-medium">
                  <span className="uppercase">+ Add Payment Method</span>
                  <span>VISA #### #### #### 2345</span>
                </div>
              </div> */}
            </>
          )}
          <div className="border-t border-accent-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              {/* <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li> */}
              <li className="flex justify-between py-1">
                <span>Shipping Price</span>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={shipping}
                    onChange={handleShippingChange}
                  >
                    <FormControlLabel
                      value={50}
                      control={<Radio />}
                      label="Delhi/ NCR - ₹50"
                    />

                    <FormControlLabel
                      value={80}
                      control={<Radio />}
                      label="NorthEast/ J&K - ₹80"
                    />
                    <FormControlLabel
                      value={70}
                      control={<Radio />}
                      label="Rest Of India - ₹70"
                    />
                  </RadioGroup>
                </FormControl>
                <span className="font-bold tracking-wide">{shipping}</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-10">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Continue Shopping
                </Button>
              ) : (
                <>
             {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Link href="/shipping">
                <a>
                <Button Component="a" width="100%" onClick={CheckoutCookieSet}>
                  Proceed to Checkout ({total})
                </Button></a>
                </Link>
              ) : (
                <Button href="/" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.Layout = Layout
