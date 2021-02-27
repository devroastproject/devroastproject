from os import truncate
from subprocess import run

u_options = {
    1: "Bootstrap containers.",
    2: "Boot Django dev server.",
    3: "Run migrations for all apps.",
    4: "Run unit tests.",
}

for key, val in u_options.items():

    print(key, val)

# Prompt the user to make a choice
u_choice = int(input("Enter an int: "))

if u_choice == 1:
    run(['docker-compose', 'up'], check=True)
elif u_choice == 2:
    run(['docker-compose', 'exec', 'django', 'manage.py', 'runserver'], check=True)
elif u_choice == 3:
    run(['docker-compose', 'exec', 'django', 'python', 'manage.py', 'makemigrations', 'users'], check=True)
    run(['docker-compose', 'exec', 'django', 'python', 'manage.py', 'migrate'], check=True)
    run(['docker-compose', 'exec', 'django', 'python', 'manage.py', 'makemigrations', 'project'], check=True)
    run(['docker-compose', 'exec', 'django', 'python', 'manage.py', 'migrate'], check=True)
elif u_choice == 4:
    run(['docker-compose', 'exec', 'django', 'python', 'manage.py', 'test'], check=True)
else:
    print("Invalid choice.")
    