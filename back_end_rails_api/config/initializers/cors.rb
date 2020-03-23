Rails.application.config.middleware.insert_before 0, Rack::Cors do 
    allow do
        origin "http://localhost:3000"
        resource "*", headers: :any, methods: [:get, :put, :post, :patch, :delete, :options, :head]
    end
end