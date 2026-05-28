"""merge migration heads

Revision ID: 57ccf359d3d1
Revises: db663fde25dc, ec1bf0ace062, fb817ca5adfa
Create Date: 2026-05-28 13:34:15.978241

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '57ccf359d3d1'
down_revision: Union[str, Sequence[str], None] = ('db663fde25dc', 'ec1bf0ace062', 'fb817ca5adfa')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
