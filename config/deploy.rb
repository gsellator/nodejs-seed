
# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'amecourt'
set :repo_url, 'git@github.com:ghislaindj/amecourt.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/home/amecourt'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
#set :linked_files, %w{server/auth-providers.json}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5


namespace :deploy do

  desc "Install node modules non-globally"
  task :npm_install do
    on roles(:app) do
      execute "cd #{current_path} && npm install --production"
    end
  end

  desc "Grunt sass"
  task :grunt_sass do
    on roles(:app) do
      execute "cd #{current_path} && grunt sass"
    end
  end

  desc 'Stop Forever'
  task :forever_stop do
    on roles(:app) do
      execute "sh /home/amecourt/stop.sh"
    end
  end

  desc 'Start Forever'
  task :forever_start do
    on roles(:app) do
      execute "sh /home/amecourt/start.sh"
    end
  end

  desc 'Restart application'
  task :restart => [:forever_stop, :forever_start]

  before 'deploy:published', 'deploy:npm_install'

  after 'deploy:published', 'deploy:restart'

  #before 'deploy:updated', 'deploy:grunt_sass'

end