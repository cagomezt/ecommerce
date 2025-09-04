from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        import base.signals
        # Ensures the signals are imported and registered when the app is ready
        # This is necessary to connect the signal handlers defined in signals.py
        # without causing circular import issues.

        # You can add additional initialization code here if needed.