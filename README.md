## Book-GPT: A Scalable Dockerized Application

This application leverages Docker Compose for a streamlined and efficient deployment, allowing you to manage your Book-GPT instance with ease.

## Installation Requirements

* Docker: Ensure you have Docker installed on your system. Download instructions can be found at [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
## Method 1 (recommended):

### Using Docker Compose

**1. Clone the Repository and Run Docker Compose**

Start by cloning the Book-GPT repository from GitHub:

```bash
git clone https://github.com/LucasToepoel/Book-GPT.git
cd Book-GPT
```

This will download the project files to your local machine. Navigate to the project directory using `cd your-repo`.



The project utilizes Docker Compose for managing the multi-container application. Within the project directory, you'll find a file named `docker-compose.yml`.

**(now if you already have a database manager, or do not wish to alter the DB using one, remove phpmyadmin from the yml file instructions)**

To start all the containers in the background, simply run:

```bash
docker-compose up -d
```

This command will:

* Build the services defined in `docker-compose.yml` (if necessary)
* Start all the containers in detached mode (-d)
## Method 2:

### Using Single Docker Containers

This section outlines how to run individual containers if you prefer a more granular approach.

**1. Pull Pre-built Images**

Start by pulling the pre-built Docker images for the Deep Dive API and Database from the Docker Hub registry:

```bash
docker pull tiesnoordhuis/deep_dive_api
docker pull tiesnoordhuis/deep_dive_database
```

**2. Run the Database Container**

Run the `deep_dive_database` container, mapping its internal port 3306 to your machine's port 3306 for external access:

```bash
docker run -p 3306:3306 --name deep_dive_database_container tiesnoordhuis/deep_dive_database
```

**3. Run the API Container**

Run the `deep_dive_api` container, mapping its internal port 8000 to your machine's port 8000 and linking it to the `deep_dive_database_container` using the alias `db`:

```bash
docker run -p 8000:8000 --link deep_dive_database_container:db --name deep_dive_api_container tiesnoordhuis/deep_dive_api
```

**4. Optional: Run phpMyAdmin (Database Management Tool)**

If desired, you can run a phpMyAdmin container for visual database management:

```bash
docker pull phpmyadmin
docker run --name phpmyadmin -d --link deep_dive_database_container:db -p 8082:80 phpmyadmin
```

This will expose phpMyAdmin at `http://localhost:8082` allowing you to manage your database content.

## Usage

Once the containers are running, access your Book-GPT application at `http://localhost:8000` in your web browser.

## Contributing

We welcome your contributions! Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact me here, on github or any other contributor

***this is a practise college project, development goal is a MinimalViableProduct (do not expect any further development)***


