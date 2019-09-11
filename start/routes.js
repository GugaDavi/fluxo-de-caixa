'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update')

  Route.post('stores', 'StoreController.store')

  Route.get('clients/:storeId', 'ClientController.index')
  Route.post('clients', 'ClientController.store')
  Route.put('clients', 'ClientController.update')

  Route.get('moves/:storeId', 'MovesController.index')
  Route.post('moves', 'MovesController.store')

  Route.get('sales/:storeId', 'SalesController.index')
  Route.post('sales', 'SalesController.store')
}).middleware(['auth'])
