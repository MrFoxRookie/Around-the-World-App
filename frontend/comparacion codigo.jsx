 <CurrentUserContext.Provider
    value={{
      currentUser,
      handleUpdateUser,
      handleUpdateAvatar,
    }}
  >
    {isLoggedIn ? (
      <div className="page__content">
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    ) : (
      <Routes>
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    )}
  </CurrentUserContext.Provider>