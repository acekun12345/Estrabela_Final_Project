import { useEffect, useRef, useState } from 'react';
import type { Addon } from './AddonsSelection';
import type { Meal } from './MealsSelection';
import type { Venue } from '../features/venues/VenueSelection';

type TotalCostProps = {
  venue: Venue | null;
  addons: Addon[];
  addonQuantities: Record<string, number>;
  meals: Meal[];
  mealQuantities: Record<string, number>;
  venueQuantity?: number;
};

type CostRow = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function TotalCost({
  venue,
  addons,
  addonQuantities,
  meals,
  mealQuantities,
  venueQuantity,
}: TotalCostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isOpen || !dialog) {
      return;
    }

    dialog.showModal();
    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [isOpen]);

  const rows: CostRow[] = [
    ...(venue && (venueQuantity ?? 1) > 0
      ? [
          {
            id: `venue-${venue.id}`,
            name: venue.name,
            quantity: venueQuantity ?? 1,
            unitPrice: venue.price,
          },
        ]
      : []),
    ...addons
      .filter((addon) => (addonQuantities[String(addon.id)] ?? 0) > 0)
      .map((addon) => ({
        id: `addon-${addon.id}`,
        name: addon.name,
        quantity: addonQuantities[String(addon.id)],
        unitPrice: addon.price,
      })),
    ...meals
      .filter((meal) => (mealQuantities[String(meal.id)] ?? 0) > 0)
      .map((meal) => ({
        id: `meal-${meal.id}`,
        name: meal.name,
        quantity: mealQuantities[String(meal.id)],
        unitPrice: meal.price,
      })),
  ];

  const total = rows.reduce(
    (sum, row) => sum + row.quantity * row.unitPrice,
    0,
  );

  return (
    <section aria-label="Expense total">
      <p>
        Estimated total: <strong>{currencyFormatter.format(total)}</strong>
      </p>
      <button type="button" onClick={() => setIsOpen(true)}>
        View cost summary
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="total-cost-title"
        onClose={() => setIsOpen(false)}
        style={{
          width: 'min(640px, calc(100% - 32px))',
          maxHeight: '80vh',
          padding: '24px',
          border: '1px solid #536159',
          borderRadius: '12px',
          color: '#f7f4ef',
          background: '#17211d',
          boxShadow: '0 24px 70px rgb(0 0 0 / 45%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <h2 id="total-cost-title">Expense summary</h2>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: 'left', padding: '10px 4px' }}>
                Item
              </th>
              <th scope="col" style={{ textAlign: 'right', padding: '10px 4px' }}>
                Qty
              </th>
              <th scope="col" style={{ textAlign: 'right', padding: '10px 4px' }}>
                Unit cost
              </th>
              <th scope="col" style={{ textAlign: 'right', padding: '10px 4px' }}>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row" style={{ textAlign: 'left', padding: '10px 4px' }}>
                  {row.name}
                </th>
                <td style={{ textAlign: 'right', padding: '10px 4px' }}>
                  {row.quantity}
                </td>
                <td style={{ textAlign: 'right', padding: '10px 4px' }}>
                  {currencyFormatter.format(row.unitPrice)}
                </td>
                <td style={{ textAlign: 'right', padding: '10px 4px' }}>
                  {currencyFormatter.format(row.quantity * row.unitPrice)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '16px 4px', textAlign: 'center' }}>
                  No expenses selected yet.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                style={{ padding: '14px 4px', textAlign: 'right' }}
              >
                Total
              </th>
              <td style={{ padding: '14px 4px', textAlign: 'right' }}>
                <strong>{currencyFormatter.format(total)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button type="button" onClick={() => window.print()}>
            Print summary
          </button>
        </div>
      </dialog>
    </section>
  );
}

export default TotalCost;
