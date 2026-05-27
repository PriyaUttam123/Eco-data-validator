from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Tenant
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Seed initial mock data for development'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Create Mock User
        user, created = User.objects.get_or_create(
            username='admin',
            email='admin@enterprise-corp.com'
        )
        if created:
            user.set_password('admin123')
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Created user: {user.username}'))
        else:
            self.stdout.write(f'User {user.username} already exists')

        # 2. Create Sample Tenant
        tenant, created = Tenant.objects.get_or_create(
            name='Enterprise Corp',
            domain='enterprise-corp.com'
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created tenant: {tenant.name}'))
        else:
            self.stdout.write(f'Tenant {tenant.name} already exists')

        # 3. Create API Token
        token, created = Token.objects.get_or_create(user=user)
        self.stdout.write(self.style.SUCCESS(f'API Token: {token.key}'))

        self.stdout.write(self.style.SUCCESS('Seeding completed successfully!'))
