import Link from "next/link";
import { formatDate } from "@/lib/date-utils";

export default function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
        
        {post.image_url && (
          <div className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-50">
            <img
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              className="max-h-full max-w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {formatDate(post.created_at)}
          </p>
        </div>
      </div>
    </Link>
  );
}
