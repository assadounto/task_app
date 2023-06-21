Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root :to => 'tasks#index'
  # Defines the root path route ("/")
  # root "articles#index"
  resources :tasks, except: [:new, :edit] do
    patch 'complete', on: :member
  end
  
end
