package org.example.api.services;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.example.configs.CorsFilter;
import org.glassfish.jersey.servlet.ServletContainer;

public class APIServer {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8100);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/api");
        server.setHandler(context);

        ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);
        jerseyServlet.setInitParameter("jersey.config.server.provider.packages", "org.example");

        context.addFilter(CorsFilter.class, "/*", null);

        server.start();
        server.join();
    }
}
