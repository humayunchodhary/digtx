import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/helpers';
import { openWhatsApp, whatsappDisplayNumber } from '../components/WhatsAppButton';

type PaymentMethod = 'cod' | 'bank' | 'wallet';
type ShippingMethod = 'standard' | 'express';

interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
  shipping: ShippingMethod;
  payment: PaymentMethod;
}

const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
  'Gujranwala',
  'Other',
];

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING = 350;
const EXPRESS_SHIPPING = 700;

function createOrderId() {
  const stamp = Date.now().toString().slice(-8);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `DXP-${stamp}${rand}`;
}

export default function Checkout() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placedForm, setPlacedForm] = useState<CheckoutForm | null>(null);
  const [placedTotal, setPlacedTotal] = useState(0);
  const [placedMessage, setPlacedMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
    shipping: 'standard',
    payment: 'cod',
  });

  const shippingFee = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD && form.shipping === 'standard') return 0;
    return form.shipping === 'express' ? EXPRESS_SHIPPING : STANDARD_SHIPPING;
  }, [form.shipping, subtotal]);

  const total = subtotal + shippingFee;

  if (items.length === 0 && !orderId) {
    return <Navigate to="/cart" replace />;
  }

  const updateField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      next.fullName = 'Please enter your full name';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 12) {
      next.phone = 'Enter a valid Pakistani phone number';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.city) next.city = 'Select your city';
    if (!form.address.trim() || form.address.trim().length < 8) {
      next.address = 'Enter a complete delivery address';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    const id = createOrderId();
    const paymentLabel =
      form.payment === 'cod'
        ? 'Cash on Delivery'
        : form.payment === 'bank'
          ? 'Bank Transfer'
          : 'JazzCash / Easypaisa';
    const shippingLabel =
      form.shipping === 'express' ? 'Express Delivery (1–2 days)' : 'Standard Delivery (3–5 days)';

    const productLines = items
      .map(
        (item, index) =>
          `${index + 1}) ${item.product.title}\n   Qty: ${item.quantity} × ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}`,
      )
      .join('\n');

    const message = [
      `*New DigitX Pro Order*`,
      `Order ID: ${id}`,
      ``,
      `*Customer Details*`,
      `Name: ${form.fullName.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      `City: ${form.city}`,
      form.postalCode.trim() ? `Postal Code: ${form.postalCode.trim()}` : null,
      `Address: ${form.address.trim()}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : null,
      ``,
      `*Products*`,
      productLines,
      ``,
      `*Order Summary*`,
      `Subtotal: ${formatPrice(subtotal)}`,
      `Shipping (${shippingLabel}): ${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}`,
      `*Total: ${formatPrice(total)}*`,
      `Payment: ${paymentLabel}`,
      ``,
      `Please confirm this order. JazakAllah.`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    // Snapshot before clearing cart, then open WhatsApp with full order.
    setOrderId(id);
    setPlacedForm(form);
    setPlacedTotal(total);
    setPlacedMessage(message);
    clearCart();
    setSubmitting(false);

    openWhatsApp(message, { keepPage: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderId && placedForm) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[2.4rem] sm:py-[3.2rem]">
        <div className="mx-auto max-w-[640px] rounded-[20px] border border-[#eee] bg-white p-[2rem] text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-[3rem]">
          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e8f8ee] text-[#109533]">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="mt-[1.6rem] text-[2.2rem] font-bold text-[#222] sm:text-[2.6rem]">
            Order placed successfully
          </h1>
          <p className="mt-[0.8rem] text-[1.4rem] text-[#666]">
            Thank you, {placedForm.fullName.split(' ')[0]}! Your order details have been sent to
            WhatsApp ({whatsappDisplayNumber}). Please tap <strong>Send</strong> in WhatsApp if the
            chat is open.
          </p>

          <div className="mt-[2rem] rounded-[14px] bg-[#fffaf5] p-[1.6rem] text-left">
            <div className="flex items-center justify-between gap-[1rem] border-b border-[#f0e4d8] pb-[1rem]">
              <span className="text-[1.35rem] text-[#666]">Order ID</span>
              <strong className="text-[1.5rem] text-[#222]">{orderId}</strong>
            </div>
            <div className="mt-[1rem] flex items-center justify-between gap-[1rem] border-b border-[#f0e4d8] pb-[1rem]">
              <span className="text-[1.35rem] text-[#666]">Total paid / due</span>
              <strong className="text-[1.6rem] text-primary">{formatPrice(placedTotal)}</strong>
            </div>
            <div className="mt-[1rem] flex items-center justify-between gap-[1rem] border-b border-[#f0e4d8] pb-[1rem]">
              <span className="text-[1.35rem] text-[#666]">Payment</span>
              <strong className="text-[1.4rem] text-[#222]">
                {placedForm.payment === 'cod'
                  ? 'Cash on Delivery'
                  : placedForm.payment === 'bank'
                    ? 'Bank Transfer'
                    : 'JazzCash / Easypaisa'}
              </strong>
            </div>
            <div className="mt-[1rem] flex items-start justify-between gap-[1rem]">
              <span className="text-[1.35rem] text-[#666]">Deliver to</span>
              <strong className="max-w-[60%] text-right text-[1.35rem] leading-snug text-[#222]">
                {placedForm.address}, {placedForm.city}
              </strong>
            </div>
          </div>

          <div className="mt-[2rem] flex flex-col gap-[0.9rem] sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => openWhatsApp(placedMessage || `Order ${orderId}`, { keepPage: true })}
              className="btn-primary"
            >
              Open WhatsApp again
            </button>
            <Link to="/shop" className="btn-outline">
              Continue shopping
            </Link>
          </div>
          <p className="mt-[1.4rem] text-[1.25rem] text-[#878787]">
            Order goes to WhatsApp: {whatsappDisplayNumber}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa]">
      <div className="container mx-auto min-w-0 px-[1.5rem] py-[2rem] sm:py-[2.8rem]">
        <Breadcrumbs items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

        <div className="mb-[1.8rem] mt-[1.2rem] flex flex-wrap items-end justify-between gap-[1rem]">
          <div>
            <h1 className="text-[2.2rem] font-bold text-[#222] sm:text-[2.6rem]">Checkout</h1>
            <p className="mt-[0.4rem] text-[1.35rem] text-[#666]">
              Secure checkout · {totalItems} item{totalItems === 1 ? '' : 's'}
            </p>
          </div>
          <div className="flex items-center gap-[0.6rem] rounded-full bg-white px-[1.2rem] py-[0.6rem] text-[1.25rem] font-medium text-[#109533] shadow-sm">
            <ShieldCheck size={16} />
            Safe & encrypted
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-[1.8rem] lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-[1.4rem]">
            <section className="rounded-[16px] border border-[#eee] bg-white p-[1.6rem] sm:p-[2rem]">
              <div className="mb-[1.4rem] flex items-center gap-[0.8rem]">
                <span className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full bg-[#fff3e8] text-primary">
                  <MapPin size={18} />
                </span>
                <div>
                  <h2 className="text-[1.7rem] font-bold text-[#222]">Contact & Delivery</h2>
                  <p className="text-[1.25rem] text-[#878787]">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="grid gap-[1.2rem] sm:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  error={errors.fullName}
                  className="sm:col-span-2"
                >
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Ahmed Ali"
                    autoComplete="name"
                    className={inputCls(!!errors.fullName)}
                  />
                </Field>

                <Field label="Phone number" required error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="03XX XXXXXXX"
                    autoComplete="tel"
                    className={inputCls(!!errors.phone)}
                  />
                </Field>

                <Field label="Email (optional)" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    className={inputCls(!!errors.email)}
                  />
                </Field>

                <Field label="City" required error={errors.city}>
                  <select
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className={inputCls(!!errors.city)}
                  >
                    <option value="">Select city</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Postal code (optional)">
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="e.g. 75500"
                    autoComplete="postal-code"
                    className={inputCls(false)}
                  />
                </Field>

                <Field
                  label="Complete address"
                  required
                  error={errors.address}
                  className="sm:col-span-2"
                >
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="House / flat, street, area, landmark"
                    rows={3}
                    autoComplete="street-address"
                    className={`${inputCls(!!errors.address)} resize-y`}
                  />
                </Field>

                <Field label="Order notes (optional)" className="sm:col-span-2">
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="Any delivery instructions?"
                    rows={2}
                    className={`${inputCls(false)} resize-y`}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[16px] border border-[#eee] bg-white p-[1.6rem] sm:p-[2rem]">
              <div className="mb-[1.4rem] flex items-center gap-[0.8rem]">
                <span className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full bg-[#fff3e8] text-primary">
                  <Truck size={18} />
                </span>
                <div>
                  <h2 className="text-[1.7rem] font-bold text-[#222]">Shipping method</h2>
                  <p className="text-[1.25rem] text-[#878787]">
                    Free standard shipping on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </p>
                </div>
              </div>

              <div className="grid gap-[1rem]">
                <ShippingOption
                  selected={form.shipping === 'standard'}
                  onSelect={() => updateField('shipping', 'standard')}
                  title="Standard Delivery"
                  desc="3–5 business days across Pakistan"
                  price={
                    subtotal >= FREE_SHIPPING_THRESHOLD
                      ? 'FREE'
                      : formatPrice(STANDARD_SHIPPING)
                  }
                  free={subtotal >= FREE_SHIPPING_THRESHOLD}
                />
                <ShippingOption
                  selected={form.shipping === 'express'}
                  onSelect={() => updateField('shipping', 'express')}
                  title="Express Delivery"
                  desc="1–2 business days in major cities"
                  price={formatPrice(EXPRESS_SHIPPING)}
                />
              </div>
            </section>

            <section className="rounded-[16px] border border-[#eee] bg-white p-[1.6rem] sm:p-[2rem]">
              <div className="mb-[1.4rem] flex items-center gap-[0.8rem]">
                <span className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full bg-[#fff3e8] text-primary">
                  <Wallet size={18} />
                </span>
                <div>
                  <h2 className="text-[1.7rem] font-bold text-[#222]">Payment method</h2>
                  <p className="text-[1.25rem] text-[#878787]">Pay safely — COD available nationwide</p>
                </div>
              </div>

              <div className="grid gap-[1rem]">
                <PaymentOption
                  selected={form.payment === 'cod'}
                  onSelect={() => updateField('payment', 'cod')}
                  icon={<Package size={18} />}
                  title="Cash on Delivery"
                  desc="Pay when your order arrives"
                />
                <PaymentOption
                  selected={form.payment === 'bank'}
                  onSelect={() => updateField('payment', 'bank')}
                  icon={<CreditCard size={18} />}
                  title="Bank Transfer"
                  desc="We'll share account details after order"
                />
                <PaymentOption
                  selected={form.payment === 'wallet'}
                  onSelect={() => updateField('payment', 'wallet')}
                  icon={<Wallet size={18} />}
                  title="JazzCash / Easypaisa"
                  desc="Mobile wallet payment"
                />
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-[9rem]">
            <div className="rounded-[16px] border border-[#eee] bg-white p-[1.6rem] sm:p-[2rem]">
              <h2 className="text-[1.7rem] font-bold text-[#222]">Order summary</h2>

              <ul className="mt-[1.4rem] max-h-[280px] space-y-[1.2rem] overflow-y-auto pr-[0.2rem]">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-[1rem]">
                    <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[10px] border border-[#f0f0f0] bg-[#fafafa]">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                      <span className="absolute -right-[0.4rem] -top-[0.4rem] flex h-[2rem] min-w-[2rem] items-center justify-center rounded-full bg-primary px-[0.4rem] text-[1.1rem] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[1.3rem] font-medium leading-snug text-[#222]">
                        {item.product.title}
                      </p>
                      <p className="mt-[0.3rem] text-[1.3rem] font-semibold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-[1.6rem] space-y-[0.8rem] border-t border-[#eee] pt-[1.4rem] text-[1.4rem]">
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Subtotal</span>
                  <span className="font-semibold text-[#222]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Shipping</span>
                  <span className={`font-semibold ${shippingFee === 0 ? 'text-[#109533]' : 'text-[#222]'}`}>
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#eee] pt-[1rem]">
                  <span className="text-[1.55rem] font-bold text-[#222]">Total</span>
                  <span className="text-[1.9rem] font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-cta mt-[1.6rem] w-full disabled:opacity-60"
              >
                {submitting ? 'Placing order…' : 'Place order'}
              </button>

              <Link
                to="/cart"
                className="mt-[1rem] block text-center text-[1.3rem] font-medium text-primary hover:text-primaryHover"
              >
                ← Back to cart
              </Link>

              <ul className="mt-[1.6rem] space-y-[0.7rem] border-t border-[#eee] pt-[1.4rem] text-[1.25rem] text-[#666]">
                <li className="flex items-start gap-[0.6rem]">
                  <ShieldCheck size={15} className="mt-[0.15rem] shrink-0 text-primary" />
                  2-year warranty on Digit X products
                </li>
                <li className="flex items-start gap-[0.6rem]">
                  <Truck size={15} className="mt-[0.15rem] shrink-0 text-primary" />
                  Nationwide delivery across Pakistan
                </li>
                <li className="flex items-start gap-[0.6rem]">
                  <Package size={15} className="mt-[0.15rem] shrink-0 text-primary" />
                  Easy returns within 7 days
                </li>
              </ul>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-[10px] border bg-white px-[1.2rem] py-[1rem] text-[1.4rem] text-[#222] outline-none transition-colors placeholder:text-[#aaa] ${
    hasError
      ? 'border-[#ec0101] focus:border-[#ec0101]'
      : 'border-[#ddd] focus:border-primary'
  }`;
}

function Field({
  label,
  required,
  error,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-[0.5rem] block text-[1.3rem] font-medium text-[#444]">
        {label}
        {required && <span className="text-[#ec0101]"> *</span>}
      </span>
      {children}
      {error && <span className="mt-[0.4rem] block text-[1.2rem] text-[#ec0101]">{error}</span>}
    </label>
  );
}

function ShippingOption({
  selected,
  onSelect,
  title,
  desc,
  price,
  free,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  desc: string;
  price: string;
  free?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-[1rem] rounded-[12px] border px-[1.2rem] py-[1.2rem] text-left transition-colors ${
        selected
          ? 'border-primary bg-[#fff7f0] shadow-[0_0_0_1px_#ff7a1a]'
          : 'border-[#e8e8e8] bg-white hover:border-[#ccc]'
      }`}
    >
      <span
        className={`flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-primary' : 'border-[#ccc]'
        }`}
      >
        {selected && <span className="h-[1rem] w-[1rem] rounded-full bg-primary" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.4rem] font-semibold text-[#222]">{title}</span>
        <span className="block text-[1.25rem] text-[#878787]">{desc}</span>
      </span>
      <span className={`shrink-0 text-[1.4rem] font-bold ${free ? 'text-[#109533]' : 'text-[#222]'}`}>
        {price}
      </span>
    </button>
  );
}

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  desc,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-[1rem] rounded-[12px] border px-[1.2rem] py-[1.2rem] text-left transition-colors ${
        selected
          ? 'border-primary bg-[#fff7f0] shadow-[0_0_0_1px_#ff7a1a]'
          : 'border-[#e8e8e8] bg-white hover:border-[#ccc]'
      }`}
    >
      <span
        className={`flex h-[3.6rem] w-[3.6rem] shrink-0 items-center justify-center rounded-[10px] ${
          selected ? 'bg-primary text-white' : 'bg-[#f5f5f5] text-[#555]'
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.4rem] font-semibold text-[#222]">{title}</span>
        <span className="block text-[1.25rem] text-[#878787]">{desc}</span>
      </span>
      <span
        className={`flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-primary' : 'border-[#ccc]'
        }`}
      >
        {selected && <span className="h-[1rem] w-[1rem] rounded-full bg-primary" />}
      </span>
    </button>
  );
}
