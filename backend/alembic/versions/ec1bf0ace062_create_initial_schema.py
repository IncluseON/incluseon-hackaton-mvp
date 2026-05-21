"""create initial schema

Revision ID: ec1bf0ace062
Revises: 8d215d65a21f
Create Date: 2026-05-20 19:17:18.902109

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ec1bf0ace062'
down_revision: Union[str, Sequence[str], None] = '8d215d65a21f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
