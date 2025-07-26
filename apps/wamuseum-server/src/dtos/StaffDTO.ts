import type { Staff } from '@prisma/client';
import { prisma } from '../libs/db/db.utils';

export default class StaffDTO {
  props: Partial<Staff>;

  constructor(props: Partial<Staff>) {
    this.props = props;
  }

  static async find({ userId }: { userId: string }) {
    const data = await prisma.staff.findFirst({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: true,
      },
    });
    if (!data) return null;
    return new StaffDTO(data);
  }
}
