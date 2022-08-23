import Head from 'next/head'
import { Card, CardMedia, CardContent, CardActions, CardHeader, Button, Typography, withWidth } from '@material-ui/core'
import { Product } from '../../../model'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import http from '../../../http'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'


interface ProductDetailPageProps {
  product: Product
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter()

  if (router.isFallback) {
    <div>Carregando...</div>
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
        <CardActions>
        <Link href='/products/[slug]/order'
                  as={`/products/${product.slug}/order`}
                  passHref
                >
          <Button size='small' color='primary' component='a'>
            Comprar
          </Button>
          </Link>
        </CardActions>
        <CardMedia style={{ paddingTop: "56%", }} image={product.image_url} />
        <CardContent>
          <Typography component="p" variant="body2" color="textSecondary">
            {product.descriptions}
          </Typography>
        </CardContent>
      </Card>

    </div>
  )
}
export default ProductDetailPage

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async (
  context
) => {
  const { slug } = context.params!
  try {

    const { data: product } = await http.get(`products/${slug}`)
    // console.log(products)
    return {
      props: {
        product,
      },
      revalidate: 1 * 60 * 2
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true }
    }
    throw e
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get(`products`)

  const paths = products.map((p: Product) => ({
    params: { slug: p.slug }
  }))

  return { paths, fallback: true }
}