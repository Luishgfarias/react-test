export interface Product{
    id: string;
    name: string;
    descriptions: string;
    image_url: string;
    slug: string;
    price: number;
    created_at: () => number;
}

export const products: Product[] = [
    {
      id: 'uuid',
      name: 'produto',
      descriptions: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati maiores reprehenderit voluptatum repellendus nobis ipsam ut harum aperiam corrupti deleniti impedit doloribus suscipit dolor at labore, rem eligendi necessitatibus rerum!',
      image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
      slug: 'aaaaa',
      price: 24.99,
      created_at: Date.now
    },
    {
      id: 'uuid',
      name: 'produto',
      descriptions: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati maiores reprehenderit voluptatum repellendus nobis ipsam ut harum aperiam corrupti deleniti impedit doloribus suscipit dolor at labore, rem eligendi necessitatibus rerum!',
      image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
      slug: 'bbbbb',
      price: 24.99,
      created_at: Date.now
    },
    {
      id: 'uuid',
      name: 'produto',
      descriptions: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati maiores reprehenderit voluptatum repellendus nobis ipsam ut harum aperiam corrupti deleniti impedit doloribus suscipit dolor at labore, rem eligendi necessitatibus rerum!',
      image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
      slug: 'ccccc',
      price: 24.99,
      created_at: Date.now
    }
  ]
  