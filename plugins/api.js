import Comment from '../api/comment'
import Auth from '@/api/auth'
import Product from '@/api/product'
import Cart from '@/api/cart'
import Order from '@/api/order'
export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    product: Product(context.$axios),
    comment: Comment(context.$axios),
    cart: Cart(context.$axios),
    order: Order(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
