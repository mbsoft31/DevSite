import NavigationMain from "@/components/layouts/NavigationMain";
import PublicFooter from "@/components/layouts/PublicFooter";

class PublicLayout {

  static header = ( { children, navigation, ...props } ) => {
    return (
      <header { ...props }>
        {
          children ?
            (
              children
            ) :
            (
              <NavigationMain navigation={navigation} />
            )
        }
      </header>
    )
  }

  static footer = ( { children, ...props } ) => {
    return (
      <footer { ...props }>
        {
          children ?
            (
              children
            ) :
            (
              <PublicFooter />
            )
        }
      </footer>
    )
  }

  static main = ({ children, ...props }) => {
    return (
      <main className="flex-grow" {...props}>
        {children}
      </main>
    )
  }
}

export default PublicLayout