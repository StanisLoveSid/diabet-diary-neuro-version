# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180826130123) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bsl_predictions", force: :cascade do |t|
    t.float    "prediction"
    t.boolean  "danger"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "day_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string   "commentable_type"
    t.integer  "commentable_id"
    t.string   "status"
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "days", force: :cascade do |t|
    t.text     "description"
    t.integer  "user_id"
    t.string   "compensation"
    t.string   "data"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "month_id"
    t.integer  "day_number"
    t.string   "mode"
  end

  create_table "exercises", force: :cascade do |t|
    t.text     "description"
    t.string   "status"
    t.integer  "day_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.float    "duration",    default: 0.0
    t.string   "begining"
    t.string   "ending"
  end

  create_table "friendships", force: :cascade do |t|
    t.string   "friendable_type"
    t.integer  "friendable_id"
    t.integer  "friend_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "blocker_id"
    t.integer  "status"
  end

  create_table "hospitals", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "avatar"
    t.integer  "rate"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
  end

  create_table "hospitals_users", id: false, force: :cascade do |t|
    t.integer "hospital_id"
    t.integer "user_id"
  end

  create_table "insulin_injections", force: :cascade do |t|
    t.string   "insulin_type"
    t.integer  "amount"
    t.integer  "day_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "meals", force: :cascade do |t|
    t.float    "bread_units"
    t.text     "description"
    t.float    "carbohydrates"
    t.float    "proteins"
    t.float    "fats"
    t.integer  "day_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "months", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "compensation"
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "year_id"
    t.string   "month_name"
  end

  create_table "sugar_levels", force: :cascade do |t|
    t.decimal  "mmol"
    t.string   "status"
    t.integer  "day_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "role"
    t.integer  "hospital_id"
    t.string   "aasm_state"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "warnings", force: :cascade do |t|
    t.string   "reason"
    t.text     "description"
    t.integer  "day_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "years", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "compensation"
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "year_number"
  end

end
