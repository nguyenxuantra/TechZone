// import React from 'react';
// import {
//   Box,
//   Snackbar,
//   Alert,
//   AlertTitle,
//   Slide,
//   type SliderProps,
  
// } from '@mui/material';
// import {
//   CheckCircle,
//   Error,
//   Warning,
//   Info,
//   Close
// } from '@mui/icons-material';

// export interface NotificationProps {
//   open: boolean;
//   message: string;
//   title?: string;
//   type: 'success' | 'error' | 'warning' | 'info';
//   duration?: number;
//   onClose: () => void;
// }

// // Slide transition for notifications
// function SlideTransition(props: SliderProps) {
//   return <Slide {...props} direction="left" />;
// }

// // Notification context for managing notifications globally
// export interface NotificationContextType {
//   showNotification: (props: Omit<NotificationProps, 'open' | 'onClose'>) => void;
//   showSuccess: (message: string, title?: string) => void;
//   showError: (message: string, title?: string) => void;
//   showWarning: (message: string, title?: string) => void;
//   showInfo: (message: string, title?: string) => void;
// }

// export const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

// // Hook to use notifications
// export const useNotification = () => {
//   const context = React.useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }
//   return context;
// };

// // Notification provider component
// export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [notification, setNotification] = React.useState<NotificationProps>({
//     open: false,
//     message: '',
//     type: 'info',
//     duration: 4000,
//     onClose: () => {}
//   });

//   const showNotification = (props: Omit<NotificationProps, 'open' | 'onClose'>) => {
//     setNotification({
//       ...props,
//       open: true,
//       onClose: () => setNotification(prev => ({ ...prev, open: false }))
//     });
//   };

//   const showSuccess = (message: string, title?: string) => {
//     showNotification({
//       message,
//       title: title || 'Thành công',
//       type: 'success',
//       duration: 3000
//     });
//   };

//   const showError = (message: string, title?: string) => {
//     showNotification({
//       message,
//       title: title || 'Lỗi',
//       type: 'error',
//       duration: 5000
//     });
//   };

//   const showWarning = (message: string, title?: string) => {
//     showNotification({
//       message,
//       title: title || 'Cảnh báo',
//       type: 'warning',
//       duration: 4000
//     });
//   };

//   const showInfo = (message: string, title?: string) => {
//     showNotification({
//       message,
//       title: title || 'Thông tin',
//       type: 'info',
//       duration: 4000
//     });
//   };

//   const handleClose = () => {
//     setNotification(prev => ({ ...prev, open: false }));
//   };

//   const getIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle />;
//       case 'error':
//         return <Error />;
//       case 'warning':
//         return <Warning />;
//       case 'info':
//         return <Info />;
//       default:
//         return <Info />;
//     }
//   };

//   const getColor = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'success';
//       case 'error':
//         return 'error';
//       case 'warning':
//         return 'warning';
//       case 'info':
//         return 'info';
//       default:
//         return 'info';
//     }
//   };

//   return (
//     <NotificationContext.Provider value={{
//       showNotification,
//       showSuccess,
//       showError,
//       showWarning,
//       showInfo
//     }}>
//       {children}
      
//       {/* Global Notification */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={notification.duration}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         TransitionComponent={SlideTransition}
//         sx={{
//           '& .MuiSnackbar-root': {
//             top: 24,
//             right: 24
//           }
//         }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity={getColor(notification.type)}
//           variant="filled"
//           icon={getIcon(notification.type)}
//           sx={{
//             minWidth: 300,
//             maxWidth: 400,
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
//             borderRadius: 2,
//             '& .MuiAlert-icon': {
//               fontSize: 24
//             },
//             '& .MuiAlert-message': {
//               fontSize: '0.9rem'
//             }
//           }}
//         >
//           {notification.title && (
//             <AlertTitle sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
//               {notification.title}
//             </AlertTitle>
//           )}
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </NotificationContext.Provider>
//   );
// };

// // Individual notification component (for standalone use)
// const Notification: React.FC<NotificationProps> = ({
//   open,
//   message,
//   title,
//   type,
//   duration = 4000,
//   onClose
// }) => {
//   const handleClose = () => {
//     onClose();
//   };

//   const getIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle />;
//       case 'error':
//         return <Error />;
//       case 'warning':
//         return <Warning />;
//       case 'info':
//         return <Info />;
//       default:
//         return <Info />;
//     }
//   };

//   const getColor = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'success';
//       case 'error':
//         return 'error';
//       case 'warning':
//         return 'warning';
//       case 'info':
//         return 'info';
//       default:
//         return 'info';
//     }
//   };

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={duration}
//       onClose={handleClose}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       TransitionComponent={SlideTransition}
//       sx={{
//         '& .MuiSnackbar-root': {
//           top: 24,
//           right: 24
//         }
//       }}
//     >
//       <Alert
//         onClose={handleClose}
//         severity={getColor(type)}
//         variant="filled"
//         icon={getIcon(type)}
//         sx={{
//           minWidth: 300,
//           maxWidth: 400,
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
//           borderRadius: 2,
//           '& .MuiAlert-icon': {
//             fontSize: 24
//           },
//           '& .MuiAlert-message': {
//             fontSize: '0.9rem'
//           }
//         }}
//       >
//         {title && (
//           <AlertTitle sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
//             {title}
//           </AlertTitle>
//         )}
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default Notification;
