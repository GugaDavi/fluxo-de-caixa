'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update')

  Route.post('stores', 'StoreController.store')
  Route.get('stores', 'StoreController.index')

  Route.get('clients/:storeId', 'ClientController.index')
  Route.post('clients', 'ClientController.store')
  Route.put('clients', 'ClientController.update')

  Route.get('moves/:storeId', 'MovesController.index')
  Route.post('moves', 'MovesController.store')

  Route.get('sales/:storeId', 'SalesController.index')
  Route.post('sales', 'SalesController.store')
  Route.put('sales/:saleId', 'SalesController.update')
  Route.delete('sales/:saleId', 'SalesController.destroy')

  Route.get('goals/:storeId', 'GoalsController.index')
  Route.post('goals', 'GoalsController.store')
}).middleware(['auth'])
