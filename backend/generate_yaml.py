from jinja2 import Template, FileSystemLoader, Environment
import os

template = Template("app.jinja")
template_loader = FileSystemLoader(searchpath="./")
template_env = Environment(loader=template_loader)
template = template_env.get_template("backend/app-spec.jinja")
r = template.render(env=os.environ)

with open("backend/app-spec.yaml", "w") as file:
    file.write(r)
