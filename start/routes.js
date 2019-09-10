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

  Route.post('moves', 'MovesController.store')
  Route.put('moves/:id', 'MovesController.update')
}).middleware(['auth'])
