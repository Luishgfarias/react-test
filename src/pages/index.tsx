import Head from 'next/head'
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid } from '@material-ui/core'
import Link from 'next/link'
import { Product } from '../model'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { GetServerSideProps, NextPage } from 'next'
import http from '../http'


interface HomeProps {
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>listagem de prudutos</title>
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Produtos
      </Typography>

      <Grid container spacing={4}>
        {products.map((product, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia style={{ paddingTop: "50%" }} image={product.image_url} />
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href='/products/[slug]'
                  as={`/products/${product.slug}`}
                  passHref
                >
                  <Button size='small' color='primary' component='a'>Detalhes</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const { data: products } = await http.get('products')
  // console.log(products)
  return {
    props: {
      products: products
    }
  }
}
