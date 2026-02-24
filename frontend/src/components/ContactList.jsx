import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton'
import { useAuthStore } from '../store/useAuthStore';

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <button
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="w-full card-hover p-3 rounded-lg text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <img 
                src={contact.profilePicture || "/avatar.png"}
                alt={contact.fullName}
                className="size-10 rounded-lg object-cover ring-1 ring-slate-700/50 group-hover:ring-primary-500/30 transition-all"
              />
              {onlineUsers.includes(contact._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 ring-1.5 ring-slate-800"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-semibold text-sm truncate group-hover:text-primary-400 transition-colors">{contact.fullName}</h4>
              <p className="text-slate-400 text-xs truncate">Available</p>
            </div>
          </div>
        </button>
      ))}
    </>
  )
}

export default ContactList