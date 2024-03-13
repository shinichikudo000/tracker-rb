class ApplicationController < ActionController::API
    before_action :authenticate_devise_api_token!
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    private

    def record_not_found
        render json: { error: 'Record not found' }, status: :not_found
    end
end
