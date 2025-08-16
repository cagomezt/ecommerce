#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

import os
import sys

def main():
    """
    Entry point for the Django administrative tasks.

    This function sets the default settings module for the Django project,
    handles ImportError exceptions, and executes commands passed via the
    command line.

    Raises:
        ImportError: If Django is not installed or not available in the
        PYTHONPATH environment variable.
    """
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Set the default settings module
    try:
        from django.core.management import execute_from_command_line  # Import Django's command execution utility
    except ImportError as exc:
        # Raise an error if Django is not installed or not available
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)  # Execute the command-line arguments

if __name__ == '__main__':
    main()  # Run the main function