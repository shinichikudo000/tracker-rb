require 'test_helper'

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    sign_in @user
    @category = categories(:one)
    @task = tasks(:one)
  end

  test "should get index" do
    get api_v1_category_tasks_url(@category), as: :json
    assert_response :success
  end

  test "should create task" do
    assert_difference('Task.count') do
      post api_v1_category_tasks_url(@category), params: { task: { description: "New Task", due_date: Date.today } }, as: :json
    end

    assert_response 201
  end

  test "should show task" do
    get api_v1_category_task_url(@category, @task), as: :json
    assert_response :success
  end

  test "should update task" do
    patch api_v1_category_task_url(@category, @task), params: { task: { description: "Updated Task" } }, as: :json
    assert_response 200
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete api_v1_category_task_url(@category, @task), as: :json
    end

    assert_response 204
  end
end