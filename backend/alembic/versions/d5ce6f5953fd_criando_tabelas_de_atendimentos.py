"""criando tabelas de atendimentos

Revision ID: d5ce6f5953fd
Revises: db663fde25dc, ec1bf0ace062, fb817ca5adfa
Create Date: 2026-05-29 13:03:30.290708

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd5ce6f5953fd'
down_revision: Union[str, Sequence[str], None] = ('db663fde25dc', 'ec1bf0ace062', 'fb817ca5adfa')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
