import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/Client">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Cadastro de Cliente
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Clique aqui para cadastrar um novo cliente.
          </p>
        </div>
      </Link>

      <Link href="/Agent">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Cadastro de Agente
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Clique aqui para cadastrar um novo agente.
          </p>
        </div>
      </Link>

      <Link href="/AnalyticsClient">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Relatorio de clientes
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Clique aqui para visualizar relatório.
          </p>
        </div>
      </Link>

    </main>
  );
}
