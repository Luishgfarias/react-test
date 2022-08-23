import Head from 'next/head'
import { Button, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Grid, Box } from '@material-ui/core'
import { Product } from '../../../model'
import { GetServerSideProps, NextPage } from 'next'
import http from '../../../http'
import axios from 'axios'


interface OrderPageProps {
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>

      <Typography component='h1' variant='h3' color='textPrimary' gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component='h3' variant='h6' gutterBottom>
        Pague com o cartão de crédito
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label='Nome' required fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label='Numero do Cartão' required inputProps={{ maxLength: 16 }} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label='CVV' required inputProps={{ maxLength: 3 }} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField label='Expiração mês' required inputProps={{ maxLength: 2 }} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label='Expiração ano' required inputProps={{ maxLength: 4 }} fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Pagar
          </Button>
        </Box>
      </form>
    </div>
  )
}
export default OrderPage

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async (
  context
) => {
  const { slug } = context.params!
  try {

    const { data: product } = await http.get(`products/${slug}`)
    // console.log(products)
    return {
      props: {
        product,
      }
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true }
    }
    throw e
  }
}