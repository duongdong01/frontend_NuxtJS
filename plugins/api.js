import Comment from '../api/comment'
import Auth from '@/api/auth'
import Product from '@/api/product'
export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    product: Product(context.$axios),
    comment: Comment(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
