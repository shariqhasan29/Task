import { useEffect, useState } from "react";
import type { User } from "../types";
import { fetchUsers } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import UserCard from "../components/common/users/UserCard";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-6">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Users Details Dashboard
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Discover users and explore their posts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default UsersList;
