"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity, ArrowDownRight, ArrowUpRight, Boxes, CalendarDays,
  CircleDollarSign, ClipboardList, CreditCard, LayoutDashboard,
  LogOut, Package, RefreshCw, Settings, ShoppingBag, Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import "./admin.css";

const ADMIN_ID = "64c96f84-af51-4c3a-b240-68c8cac525e1";

type Summary = {
  products: number;
  customers: number;
  orders: number;
  lowStock: number;
  income: number;
  expenses: number;
};

const emptySummary: Summary = {
  products: 0, customers: 0, orders: 0, lowStock: 0, income: 0, expenses: 0,
};

const money = new Intl.NumberFormat("es-EC", {
  style: "currency", currency: "USD", maximumFractionDigits: 2,
});

export default function AdminDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary>(emptySummary);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || user.id !== ADMIN_ID) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    setUserEmail(user.email ?? "");

    const [products, customers, orders, stock, payments, expenses] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase.from("products").select("stock_on_hand, minimum_stock"),
      supabase.from("payments").select("amount"),
      supabase.from("expenses").select("amount"),
    ]);

    const firstError = products.error || customers.error || orders.error || stock.error || payments.error || expenses.error;
    if (firstError) {
      console.error("Error cargando el resumen:", firstError.message);
    }

    const lowStock = (stock.data ?? []).filter(
      (product) => Number(product.stock_on_hand) <= Number(product.minimum_stock)
    ).length;

    setSummary({
      products: products.count ?? 0,
      customers: customers.count ?? 0,
      orders: orders.count ?? 0,
      lowStock,
      income: (payments.data ?? []).reduce((sum, row) => sum + Number(row.amount || 0), 0),
      expenses: (expenses.data ?? []).reduce((sum, row) => sum + Number(row.amount || 0), 0),
    });
    setLoading(false);
    setRefreshing(false);
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function refresh() {
    setRefreshing(true);
    await loadDashboard();
  }

  const navItems = [
    { label: "Resumen", icon: LayoutDashboard, active: true, href: "/admin" },
    { label: "Productos", icon: Package, href: "/admin/productos" },
    { label: "Inventario", icon: Boxes, href: "/admin/inventario" },
    { label: "Pedidos", icon: ClipboardList, href: "/admin/pedidos" },
    { label: "Clientes", icon: Users, href: "/admin/clientes" },
    { label: "Finanzas", icon: CircleDollarSign, href: "/admin/finanzas" },
  ];

  return (
    <main className="manager-shell">
      <aside className="manager-sidebar">
        <a className="manager-logo" href="/admin">ATEL<span>3D</span></a>
        <p className="sidebar-label">GESTIÓN DEL ESTUDIO</p>
        <nav className="manager-nav" aria-label="Navegación principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} className={item.active ? "manager-nav-link active" : "manager-nav-link"}>
                <Icon size={18} strokeWidth={1.7} /> {item.label}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <a className="manager-nav-link" href="/admin/configuracion"><Settings size={18} /> Configuración</a>
          <button className="manager-nav-link logout-link" onClick={handleLogout}><LogOut size={18} /> Cerrar sesión</button>
          <div className="sidebar-user"><div className="user-avatar">A</div><div><strong>Administrador</strong><span>{userEmail}</span></div></div>
        </div>
      </aside>

      <section className="manager-main">
        <header className="manager-header">
          <div>
            <p className="admin-kicker">ATEL 3D / PANEL DE CONTROL</p>
            <h1>Resumen <em>general.</em></h1>
          </div>
          <button className="refresh-button" onClick={refresh} disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? "spin" : ""} /> Actualizar
          </button>
        </header>

        <div className="welcome-strip">
          <div><span className="welcome-dot" /> SISTEMA OPERATIVO</div>
          <p>Gestiona tu estudio, controla tus pedidos y da forma a nuevas ideas.</p>
          <span className="welcome-date"><CalendarDays size={15} /> {new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(new Date())}</span>
        </div>

        <section className="metrics-grid" aria-label="Indicadores del negocio">
          <article className="metric-card">
            <div className="metric-top"><span>Productos</span><Package size={18} /></div>
            <strong>{loading ? "—" : summary.products}</strong>
            <small>Productos registrados</small>
          </article>
          <article className="metric-card">
            <div className="metric-top"><span>Pedidos</span><ShoppingBag size={18} /></div>
            <strong>{loading ? "—" : summary.orders}</strong>
            <small>Pedidos registrados</small>
          </article>
          <article className="metric-card">
            <div className="metric-top"><span>Clientes</span><Users size={18} /></div>
            <strong>{loading ? "—" : summary.customers}</strong>
            <small>Clientes registrados</small>
          </article>
          <article className="metric-card metric-warning">
            <div className="metric-top"><span>Stock bajo</span><Activity size={18} /></div>
            <strong>{loading ? "—" : summary.lowStock}</strong>
            <small>Productos en nivel mínimo</small>
          </article>
        </section>

        <section className="finance-grid">
          <article className="finance-card">
            <div className="finance-heading"><div className="finance-icon income-icon"><ArrowDownRight size={18} /></div><span>Dinero recibido</span></div>
            <strong>{loading ? "—" : money.format(summary.income)}</strong>
            <small>Total de pagos registrados</small>
          </article>
          <article className="finance-card">
            <div className="finance-heading"><div className="finance-icon expense-icon"><ArrowUpRight size={18} /></div><span>Gastos registrados</span></div>
            <strong>{loading ? "—" : money.format(summary.expenses)}</strong>
            <small>Total de gastos registrados</small>
          </article>
          <article className="finance-card balance-card">
            <div className="finance-heading"><div className="finance-icon balance-icon"><CreditCard size={18} /></div><span>Diferencia de caja</span></div>
            <strong>{loading ? "—" : money.format(summary.income - summary.expenses)}</strong>
            <small>Pagos recibidos menos gastos</small>
          </article>
        </section>

        <section className="manager-lower">
          <div className="lower-card">
            <div className="lower-card-heading"><div><p className="admin-kicker">GESTIÓN</p><h2>Accesos rápidos</h2></div></div>
            <div className="quick-links">
              <a href="/admin/productos"><Package size={19} /><span><strong>Agregar producto</strong><small>Registra una nueva pieza</small></span><ArrowUpRight size={16} /></a>
              <a href="/admin/pedidos"><ClipboardList size={19} /><span><strong>Crear pedido</strong><small>Registra una nueva venta</small></span><ArrowUpRight size={16} /></a>
              <a href="/admin/clientes"><Users size={19} /><span><strong>Agregar cliente</strong><small>Guarda un nuevo contacto</small></span><ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="lower-card lower-note">
            <div className="note-mark"><Boxes size={22} /></div>
            <p className="admin-kicker">ATEL / CONTROL</p>
            <h2>Todo empieza<br />con una buena idea.</h2>
            <p>Los indicadores se actualizarán a medida que registres productos, pedidos, pagos y gastos.</p>
          </div>
        </section>
        <footer className="manager-footer">ATEL MANAGER <span>·</span> DISEÑO Y FABRICACIÓN DIGITAL</footer>
      </section>
    </main>
  );
}
