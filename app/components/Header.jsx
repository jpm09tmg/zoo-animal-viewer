'use client';

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🦁</span>
            <div>
              <h1 className="text-3xl font-bold">Zoo Animal Viewer</h1>
              <p className="text-green-100">Manage and explore our amazing animals</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-lg font-medium">{user.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-green-100 text-sm">{user.email}</span>
                {user.role === 'admin' && (
                  <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}